import React from 'react';
import { render, screen } from '@testing-library/react';
import Captcha from '../index';

test('renders Captcha component', () => {
    const name: string = "Testing Name";
    const props = {
        name
    }
    render(<Captcha {...props} />);
    const linkElement = screen.getByText(new RegExp(name, 'i'));
    expect(linkElement).toBeInTheDocument();
});
