import { Button, Table, Text } from '@mantine/core';
import React, { VFC } from 'react';
import { useInfoStore } from '../stores/info.store';
import { formatBytes } from '../utils/formatBytes';

const FormatsTable: VFC = () => {
	const { state } = useInfoStore();

	if (!state) return null;

	const {
		info: {
			videoDetails: { video_url },
		},
		formats,
	} = state;

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th>Quality</th>
						<th style={{ textAlign: 'right' }}>Size</th>
						<th style={{ textAlign: 'right' }} />
					</tr>
				</thead>
				<tbody>
					{formats.map(({ itag, qualityLabel, contentLength }) => (
						<tr key={itag}>
							<td>{qualityLabel}</td>
							<td style={{ textAlign: 'right' }}>
								{formatBytes(parseInt(contentLength, 10))}
							</td>
							<td style={{ textAlign: 'right' }}>
								<Button
									component='a'
									href={`/api/download?url=${video_url}&itag=${itag}`}
									target='_blank'
								>
									Download
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Text>
				* Size shown may not include audio, actual file sizes maybe larger
			</Text>
		</>
	);
};

export default FormatsTable;
