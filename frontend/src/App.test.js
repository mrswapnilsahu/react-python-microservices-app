import App from "./App";

test('App tests', async () => {
    render(<App/>);
    expect(screen.getByText('Sortable gallery')).toBeInTheDocument();
});