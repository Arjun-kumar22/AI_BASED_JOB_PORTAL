export async function exportElementToPdf(elementId: string, filename: string = 'Titan_Resume.pdf'): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id '${elementId}' not found for PDF export.`);
      return false;
    }

    // Capture Canvas
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    return false;
  }
}
