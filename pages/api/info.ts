import { NextApiRequest, NextApiResponse } from 'next';
import ytdl, { videoInfo } from 'ytdl-core';
import { axios } from '../../lib/axios';

export type InfoResponse = { info: videoInfo; formats: ytdl.videoFormat[] };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { url } = req.query;

	try {
		const info = await ytdl.getInfo(url as string);

		const _formats = ytdl.filterFormats(
			info.formats,
			(format) =>
				format.hasVideo && format.container === 'mp4' && !!format.contentLength
		);

		const uniqueQuality = _formats
			.map(({ qualityLabel }) => qualityLabel)
			.filter((v, index, arr) => arr.indexOf(v) === index)
			.sort(
				(a, d) => parseInt(d.slice(0, -1), 10) - parseInt(a.slice(0, -1), 10)
			);

		const formats = uniqueQuality.map((v) => {
			const videoAndAudio = _formats.find(
				({ qualityLabel, hasVideo, hasAudio }) =>
					qualityLabel === v && hasVideo && hasAudio
			);

			if (videoAndAudio) return videoAndAudio;

			const videoOnly = _formats.find(
				({ qualityLabel, hasVideo }) => qualityLabel === v && hasVideo
			);

			return videoOnly!;
		});

		res.status(200).json({ info, formats } as InfoResponse);
	} catch (err) {
		res.status(500).send((err as Error).message);
	}
};

export default handler;

export const getInfo = (url: string) =>
	axios
		.get<InfoResponse>('/api/info', {
			params: { url },
		})
		.then((res) => res.data);
