/**
 * Converte una stringa base64 in Blob PDF e lo apre in una nuova tab
 */
export function openPDFFromBase64(base64String) {
  const binary = atob(base64String);
  const bytes = new Uint8Array(binary.length);
  
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}