import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { VFC } from 'react';
import { useMutation } from 'react-query';
import { getInfo } from '../pages/api/info';
import { useInfoStore } from '../stores/info.store';

const YOUTUBE_REGEX =
	/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

const Searchbar: VFC = () => {
	const { onSubmit, getInputProps, setFieldError } = useForm({
		initialValues: { url: '' },
		validate: {
			url: (value) => (YOUTUBE_REGEX.test(value) ? null : 'Invalid URL'),
		},
	});

	const getInfoMutation = useMutation(getInfo);
	const { setState } = useInfoStore();

	const handleSubmit = onSubmit(({ url }) => {
		getInfoMutation.mutate(url, {
			onSuccess: (res) => {
				setState(res);
			},
			onError: (err) => {
				if (typeof err === 'string') setFieldError('url', err);
			},
		});
	});

	return (
		<form onSubmit={handleSubmit}>
			<Group align='flex-start'>
				<TextInput
					{...getInputProps('url')}
					required
					placeholder='URL'
					type='url'
					size='md'
					sx={{ flexGrow: 1 }}
				/>
				<Button
					type='submit'
					size='md'
					color='violet'
					disabled={getInfoMutation.isLoading}
				>
					Fetch
				</Button>
			</Group>
		</form>
	);
};

export default Searchbar;
