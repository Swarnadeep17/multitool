document.addEventListener('DOMContentLoaded', () => {
    const toolCategories = document.getElementById('tool-categories');
    const functionList = document.getElementById('function-list');
    const functionsUl = document.getElementById('functions');
    const selectedTool = document.getElementById('selected-tool');
    const backButton = document.getElementById('back-to-tools');

    // Load tools from tools.json
    fetch('/tools.json')
        .then(response => response.json())
        .then(tools => {
            // Display tool categories
            tools.forEach(tool => {
                const card = document.createElement('div');
                card.className = 'tool-card';
                card.textContent = tool.name;
                card.dataset.toolId = tool.id;
                card.addEventListener('click', () => {
                    // Show functions for selected tool
                    toolCategories.style.display = 'none';
                    functionList.style.display = 'block';
                    selectedTool.textContent = `${tool.name} Tools`;
                    functionsUl.innerHTML = '';
                    tool.functions.forEach(func => {
                        const li = document.createElement('li');
                        li.className = 'function-item';
                        li.textContent = func.name;
                        li.addEventListener('click', () => {
                            window.location.href = func.url;
                        });
                        functionsUl.appendChild(li);
                    });
                });
                toolCategories.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading tools:', error));

    // Back to tools button
    backButton.addEventListener('click', () => {
        functionList.style.display = 'none';
        toolCategories.style.display = 'flex';
    });
});
