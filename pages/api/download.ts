import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';
import cp from 'child_process';
import ffmpeg from 'ffmpeg-static';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { url, itag } = req.query;

	try {
		const info = await ytdl.getInfo(url as string);

		const format = info.formats.find(
			(format) => format.itag === parseInt(itag as string, 10)
		);

		if (!format) throw new Error('Format not found');

		const filename = `${info.videoDetails.title.replace(
			/[/\\?%*:|"<>]/g,
			'-'
		)}_${format.qualityLabel}.${format.container}`;

		res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

		if (format.hasAudio) ytdl(url as string, { format }).pipe(res);
		else {
			// Merge video and audio
			const audio = ytdl(url as string, { quality: 'highestaudio' });
			const video = ytdl(url as string, { format });

			const ffmpegProcess = cp.spawn(
				ffmpeg,
				[
					// Remove ffmpeg's console spamming
					'-loglevel',
					'8',
					'-hide_banner',
					// Set inputs
					'-i',
					'pipe:4',
					'-i',
					'pipe:5',
					// Map audio & video from streams
					'-map',
					'0:a',
					'-map',
					'1:v',
					// Keep encoding
					'-c:v',
					'copy',
					'-movflags',
					'frag_keyframe+empty_moov',
					// Define output container
					'-f',
					'mp4',
					'pipe:3',
				],
				{
					windowsHide: true,
					stdio: [
						/* Standard: stdin, stdout, stderr */
						'inherit',
						'inherit',
						'inherit',
						/* Custom: pipe:3, pipe:4, pipe:5 */
						'pipe',
						'pipe',
						'pipe',
					],
				}
			);

			audio.pipe((ffmpegProcess.stdio as any)[4]);
			video.pipe((ffmpegProcess.stdio as any)[5]);

			(ffmpegProcess.stdio as any)[3].pipe(res);
		}
	} catch (err) {
		res.status(500).send((err as Error).message);
	}
};

export default handler;
