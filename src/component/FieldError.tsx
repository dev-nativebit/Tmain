import React from 'react';
import { Box } from './Box';
import { ErrorMessages } from './ErrorMessage';

export enum ErrorType {
	required = 'required',
	maxLength = 'maxLength',
	minLength = 'minLength',
}

export interface FieldErrorProps {
	errorType: string;
	placeholderLabel: string;
	customErrorMessage?: string;
	error: any;
}

export const FieldError: React.FC<FieldErrorProps> = ({
	errorType,
	placeholderLabel,
	customErrorMessage,
	error,
}: FieldErrorProps) => {
	const errorMessage = {
		required: `${placeholderLabel} is required`,
	}[errorType];

	if (errorMessage) {
		return <ErrorMessages errorMessage={errorMessage} />;
	}
	if (customErrorMessage) {
		return <ErrorMessages errorMessage={customErrorMessage} />;
	}
	if (error?.message) {
		return <ErrorMessages errorMessage={error?.message} />;
	}
	return <Box />;
};
