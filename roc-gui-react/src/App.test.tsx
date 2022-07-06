import React from 'react';
import {act, render, RenderResult, screen} from '@testing-library/react';
import App from './App';

describe('The App Component', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    test('renders learn react link', () => {
        render(<App/>)
        const linkElement = screen.getByText(/Form generation example/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('should render a form with two fields', async () => {

        const {findByTestId}  =  render(<App/>);

        jest.advanceTimersByTime(3000);

        const component = await findByTestId("app");
        const inputs = component.querySelectorAll('input.form-control')

        expect(inputs).toHaveLength(2)

    })
})
