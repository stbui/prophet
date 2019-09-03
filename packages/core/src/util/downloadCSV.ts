export default (content: string, filename: string) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.appendChild(link);
    const blob = new Blob([content], { type: 'text/csv' });
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${filename}.csv`);
    link.click();
};
