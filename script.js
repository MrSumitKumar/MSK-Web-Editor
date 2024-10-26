document.body.style.overflow = 'hidden'
window.addEventListener('scroll', function () {
  if (window.scrollY >= 1080) {
    window.scrollTo(0, 1080);
  }
});

// Function to reset button styles
function resetButtonStyles() {
  const buttons = document.querySelectorAll('.icon-button');
  buttons.forEach(button => {
      button.classList.remove('active'); // Remove active class
  });
}

// Function to handle button clicks
function handleButtonClick(event) {
  resetButtonStyles(); // Reset styles for all buttons
  event.currentTarget.classList.add('active'); // Set active class for clicked button
}

// Attach event listeners to buttons
document.getElementById('htmlButton').addEventListener('click', handleButtonClick);
document.getElementById('cssButton').addEventListener('click', handleButtonClick);
document.getElementById('jsButton').addEventListener('click', handleButtonClick);


function showEditor(editor) {
  const htmlEditor = document.getElementById("html_editor");
  const cssEditor = document.getElementById("css_editor");
  const jsEditor = document.getElementById("js_editor");

  htmlEditor.style.display = "none";
  cssEditor.style.display = "none";
  jsEditor.style.display = "none";
  

  if (editor === 'html') {
    htmlEditor.style.display = "block";
  } else if (editor === 'css') {
    cssEditor.style.display = "block";
  } else if (editor === 'js') {
    jsEditor.style.display = "block";
  }
}

document.querySelector('.icons a:nth-child(1)').addEventListener('click', function () {
  showEditor('html');
});
document.querySelector('.icons a:nth-child(2)').addEventListener('click', function () {
  showEditor('css');
});
document.querySelector('.icons a:nth-child(3)').addEventListener('click', function () {
  showEditor('js');
});



function show_internal_preview() {
  const preview_left_icon = document.querySelector('header>.preview>i');
  const preview_left = document.querySelector('#preview');
  const editors = document.querySelector('#editors');
  const separator = document.querySelector('#separator');
  if (preview_left_icon.classList.contains('fa-circle-right')) {
    preview_left.style.display = 'none';
    separator.style.display = 'none';
    editors.style.width = '100%';
    preview_left_icon.classList.replace('fa-circle-right', 'fa-circle-left');
  } else {
    editors.style.width = '50%';
    preview_left.style.width = '50%';
    preview_left.style.display = 'block';
    separator.style.display = 'block';
    preview_left_icon.classList.replace('fa-circle-left', 'fa-circle-right');
  }
}



require.config({ paths: { 'vs': './package/min/vs' } });

require(['vs/editor/editor.main'], () => {
  const html_editor = monaco.editor.create(document.getElementById('html_editor'), html_Options);
  const css_editor = monaco.editor.create(document.getElementById('css_editor'), css_Options);
  const js_editor = monaco.editor.create(document.getElementById('js_editor'), JS_Options);

  // Add F9 key binding to all editors
  const addF9Binding = function (editor) {
    return editor.addCommand(monaco.KeyCode.F9, function () {
      alert("F9 pressed!");
    });
  };

  addF9Binding(html_editor);
  addF9Binding(css_editor);
  addF9Binding(js_editor);


  monaco.editor.defineTheme('mskInstituteWebTheme', {
    base: 'vs-dark', // Using a dark base theme
    inherit: true, // Inherit from the base theme
    rules: [
      // HTML
      { token: 'tag', foreground: '569CD6' },                   // HTML tags in blue
      { token: 'attribute.name', foreground: '4EC9B0' },        // Attribute names in teal
      { token: 'attribute.value', foreground: 'D19A66' },       // Attribute values in orange
      { token: 'comment.html', foreground: '6A9955', fontStyle: 'italic' }, // HTML comments in green
      { token: 'doctype', foreground: 'C678DD' }, // Doctype in purple

      // CSS
      { token: 'property.name', foreground: 'FFCC00' }, // CSS property names in yellow
      { token: 'property.value', foreground: '9CDCFE' }, // CSS property values in light blue
      { token: 'selector', foreground: 'C586C0' }, // CSS selectors in purple
      { token: 'comment.css', foreground: '6A9955', fontStyle: 'italic' }, // CSS comments in green
      { token: 'unit', foreground: 'D19A66' }, // Units like px, em, etc. in orange
      { token: 'pseudo-class', foreground: 'FFCC00' }, // Pseudo-classes in yellow

      // JavaScript
      { token: 'keyword.js', foreground: '569CD6', fontStyle: 'bold' }, // JavaScript keywords in blue
      { token: 'variable.js', foreground: 'D19A66' }, // JavaScript variables in orange
      { token: 'function.js', foreground: 'C586C0' }, // JavaScript functions in purple
      { token: 'string.js', foreground: '98C379' }, // JavaScript strings in light green
      { token: 'comment.js', foreground: '6A9955', fontStyle: 'italic' }, // JavaScript comments in green
      { token: 'number.js', foreground: 'D19A66' }, // Numbers in orange
      { token: 'operator.js', foreground: 'FFCC00' }, // Operators in yellow
      { token: 'boolean.js', foreground: '4EC9B0' }, // Booleans in teal
      { token: 'error', foreground: 'FF0000', fontStyle: 'bold' }, // Errors in red
      { token: 'warning', foreground: 'FFA500', fontStyle: 'bold' }, // Warnings in orange
    ],
    colors: {
      'editor.foreground': '#FFFFFF', // Default text color
      'editor.background': '#1E1E1E', // Background color
      // 'editorLineNumber.foreground': 'oranged', // Line number color
      'editor.selectionBackground': '#4E4E4E', // Selection background color
      'editor.selectionHighlightBackground': '#3E3E3E', // Highlighted selections
      'editorCursor.foreground': '#FFFFFF', // Cursor color
      'editorWhitespace.foreground': '#BEBEBE', // Whitespace color
      'editorIndentGuide.background': '#555555', // Indent guide color
      'editorError.foreground': '#FF0000', // Error color
      'editorWarning.foreground': '#FFA500', // Warning color
    }
  });

  // Set the theme after defining it
  monaco.editor.setTheme('mskInstituteWebTheme');






});

function createEditorOptions(value, language) {
  return {
    value,
    language,
    fontSize: 14,
    theme: 'vs-dark', // vs   ,  vs-dark  ,  hc-black
    wordWrap: true,
    mouseWheelZoom: true,
    wordWrapBreakAfterCharacters: false,
    automaticLayout: true,
    lineNumbers: "on",   // off  ,  relative  ,   interval
    autoClosingBrackets: "languageDefined",
    autoClosingTags: true,
    snippetSuggestions: "inline",
    acceptSuggestionOnEnter: "on",
    minimap: {
      enabled: false, // Disable minimap
    },
    cursorBlinking: "expand",
    scrollbar: {
      vertical: "auto"
    },
    // fontFamily: "'Fira Code', 'Courier New', monospace",
    fontFamily: "'Source Code Pro', 'Courier New', monospace",
    workbench: {
      colorTheme: "dragan",
    },


  };
};

const html_Options = createEditorOptions('', 'html');
const css_Options = createEditorOptions('', 'css');
const JS_Options = createEditorOptions('', 'javascript');


function changeTheme() {
  const selectedTheme = document.getElementById('theme').value;
  monaco.editor.setTheme(selectedTheme);
};

// Function to update live preview
function updateLivePreview() {
  const htmlContent = monaco.editor.getModels()[0].getValue();
  const cssContent = monaco.editor.getModels()[1].getValue();
  const jsContent = monaco.editor.getModels()[2].getValue();

  // Get the live preview frame and full preview tag
  const livePreviewFrame = document.getElementById('preview');
  const full_preview_tag = document.getElementById('full_preview');

  // Function to set content in the preview
  function setPreviewContent(frame, html, css, js) {
    const doc = frame.contentWindow.document;

    // Open the document
    doc.open();
    // Write HTML and CSS into the document
    doc.write(html + `<style>${css}</style>`);
    // Write JavaScript into the document
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.textContent = js; // Assign JS content as text
    doc.body.appendChild(script); // Append the script
    doc.close(); // Close the document
  }

  // Update both the live preview and the full preview
  setPreviewContent(livePreviewFrame, htmlContent, cssContent, jsContent);
  setPreviewContent(full_preview_tag, htmlContent, cssContent, jsContent);
}



let isResizing = false;
let startPosition;
const editorContainer = document.getElementById('editors');
const previewContainer = document.getElementById('preview');
const separator = document.getElementById('separator');

separator.addEventListener('mousedown', function (e) {
  isResizing = true;
  startPosition = e.clientX;
});

document.addEventListener('mousemove', function (e) {
  if (isResizing) {
    const dx = e.clientX - startPosition; // Calculate the difference in mouse position
    const editorWidth = editorContainer.offsetWidth + dx; // Calculate new editor width
    const previewWidth = previewContainer.offsetWidth - dx; // Calculate new preview width

    if (editorWidth > 200 && previewWidth > 200) {
      editorContainer.style.width = editorWidth + 'px';
      previewContainer.style.width = previewWidth + 'px';
      startPosition = e.clientX;
    }
  }
});

document.addEventListener('mouseup', function () {
  isResizing = false;
});