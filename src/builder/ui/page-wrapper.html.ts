export const pageWrapperHtml = (content: string) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css" />
          <script type="application/javascript" src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
          <style>
          body {
                margin: 0;
                padding: 0;
                width: 100vw;
            }
    
            img {
                max-width: 400px;
            }
    
            .content {
             width: 100vw;
              margin: 0 auto;
            }
            
            @media print {
           @page {
                size: A4 landscape;
                margin: 1cm;
            }
            body {
                font-size: 12pt;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }
           .content {
                transform: scale(0.75);
                transform-origin: top left;
                width: 100%;
                height: 100%;
            }
        }
            }
            
          </style>
      </head>
      <body>
          <div class="content">${content}</div>
      </body>
      </html>`;
};
