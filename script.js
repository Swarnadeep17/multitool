document.addEventListener('DOMContentLoaded', () => {
    const toolCategories = document.getElementById('tool-categories');
    const functionList = document.getElementById('function-list');
    const functionsUl = document.getElementById('functions');
    const selectedTool = document.getElementById('selected-tool');
    const backButton = document.getElementById('back-to-tools');

    console.log('Script loaded, fetching tools.json'); // Debug log
    fetch('/tools.json')
        .then(response => {
            console.log('Fetch response status:', response.status); // Debug log
            if (!response.ok) {
                throw new Error(`Failed to fetch tools.json: ${response.statusText}`);
            }
            return response.json();
        })
        .then(tools => {
            console.log('Tools loaded:', tools);
            if (tools.length === 0) {
                console.log('No tools found in tools.json');
                toolCategories.innerHTML = '<p>No tools available at the moment.</p>';
                return;
            }
            console.log('Populating tool categories');
            tools.forEach(tool => {
                console.log('Adding tool card:', tool.name);
                const card = document.createElement('div');
                card.className = 'tool-card';
                card.textContent = tool.name;
                card.dataset.toolId = tool.id;
                card.addEventListener('click', () => {
                    console.log('Tool clicked:', tool.name);
                    toolCategories.style.display = 'none';
                    functionList.style.display = 'block';
                    selectedTool.textContent = `${tool.name} Tools`;
                    functionsUl.innerHTML = '';
                    tool.functions.forEach(func => {
                        const li = document.createElement('li');
                        li.className = 'function-item';
                        li.textContent = func.name;
                        li.addEventListener('click', () => {
                            console.log('Function clicked:', func.name);
                            window.location.href = func.url;
                        });
                        functionsUl.appendChild(li);
                    });
                });
                toolCategories.appendChild(card);
            });
            console.log('Finished populating tool categories');
        })
        .catch(error => {
            console.error('Error loading tools:', error);
            toolCategories.innerHTML = '<p style="color: red;">Error loading tools: ' + error.message + '</p>';
        });

    backButton.addEventListener('click', () => {
        console.log('Back to tools clicked');
        functionList.style.display = 'none';
        toolCategories.style.display = 'flex';
    });
});
