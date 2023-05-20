import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from "./Header";
import '@testing-library/jest-dom/extend-expect';

describe('Header', () => {

    it('should render a GitHub icon button', () => {
        render(<Header />);
        
        expect(screen.getByTestId('header')).toBeInTheDocument();
        
        const iconButton = screen.queryByTestId('icon-button');
        expect(iconButton).toBeInTheDocument();
        expect(iconButton).toHaveAttribute('href', 'https://github.com/seanluong/sudoku');
        expect(iconButton).toHaveAttribute('target', '_blank');
        expect(iconButton).toHaveAttribute('rel', 'noreferrer noopener');

        const toolbar = screen.queryByTestId('toolbar');
        expect(toolbar).toHaveClass('justify-center');
    });
});