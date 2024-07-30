// PDFNavigation.js
import React from 'react';

import React from 'react';

const PDFNavigation = ({ usePDFSlickStore }) => {
  const numPages = usePDFSlickStore((s) => s.numPages);
  const pageNumber = usePDFSlickStore((s) => s.pageNumber);
  const goToPage = (pageNumber) => {
    // Implementar función para cambiar de página
    // (usando usePDFSlickStore para establecer la página)
    // Ejemplo: usePDFSlickStore((state) => state.goToPage(pageNumber));
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      goToPage(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      goToPage(pageNumber + 1);
    }
  };

  return (
    <div className="pdf-navigation">
      <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
        Anterior
      </button>
      <button onClick={goToNextPage} disabled={pageNumber === numPages}>
        Siguiente
      </button>
      <span>
        Página {pageNumber} de {numPages}
      </span>
    </div>
  );
};

export default PDFNavigation;
