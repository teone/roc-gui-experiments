import React from 'react';
import {act, render, RenderResult, screen} from '@testing-library/react';
import App from './App';

describe('The App Component', () => {

    test('renders', () => {
        render(<App/>)
        const linkElement = screen.getByText(/Form generation example/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('should render a form with two fields', async () => {

        const {findByTestId}  =  render(<App/>);

        const component = await findByTestId("app");
        const inputs = component.querySelectorAll('input.form-control')

        expect(inputs).toHaveLength(2)

    })
})
