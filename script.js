let resumeData = {}; // Declare resumeData globally

function createTile(key, value) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = `<h3>${key}</h3><p>${value}</p>`;
    tile.onclick = () => {
        copyToClipboard(value);
    };
    return tile;
}

function createWorkExperienceTile(workExp) {
    const tile = document.createElement('div');
    tile.className = 'tile card';
    tile.innerHTML = `
        <h3>${workExp.companyName}</h3>
        <div class="card-item" onclick="copyToClipboard('${workExp.companyName}')">${workExp.companyName}</div>
        <div class="card-item" onclick="copyToClipboard('${workExp.city}')">${workExp.city}</div>
        <div class="card-item" onclick="copyToClipboard('${workExp.position}')">${workExp.position}</div>
        <div class="card-item" onclick="copyToClipboard('${workExp.From}')">From - ${workExp.From}</div>
        <div class="card-item" onclick="copyToClipboard('${workExp.To}')">To - ${workExp.To}</div>
        <div class="card-item" onclick="copyToClipboard('${workExp.details.join('\\n')}')">${workExp.details.join('<br>')}</div>
    `;
    return tile;
}

function createEducationTile(edu) {
    const tile = document.createElement('div');
    tile.className = 'tile card';
    tile.innerHTML = `
        <h3>${edu.institution}</h3>
        <div class="card-item" onclick="copyToClipboard('${edu.institution}')">${edu.institution}</div>
        <div class="card-item" onclick="copyToClipboard('${edu.degree}')">${edu.degree}</div>
        <div class="card-item" onclick="copyToClipboard('${edu.graduationDate}')">${edu.graduationDate}</div>
    `;
    return tile;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // alert(`Copied to clipboard: ${text}`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function createSectionDivider(title) {
    const divider = document.createElement('div');
    divider.className = 'section-divider';
    divider.innerHTML = `<h2>${title}</h2>`;
    return divider;
}

function createSection(title, content) {
    const section = document.createElement('div');
    section.className = 'section';
    section.appendChild(createSectionDivider(title));
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    content.forEach(item => gridContainer.appendChild(item));
    section.appendChild(gridContainer);
    return section;
}

function initApp() {
    const app = document.getElementById('app');
    
    // Personal Information Section
    const personalInfoTiles = [];
    for (const [key, value] of Object.entries(resumeData)) {
        if (!['workExperience', 'education', 'skills'].includes(key)) {
            personalInfoTiles.push(createTile(key, value));
        }
    }
    app.appendChild(createSection('Personal Information', personalInfoTiles));

    // Work Experience Section
    const workExpTiles = resumeData.workExperience.map(workExp => createWorkExperienceTile(workExp));
    app.appendChild(createSection('Work Experience', workExpTiles));

    // Education Section
    const educationTiles = resumeData.education.map(edu => createEducationTile(edu));
    app.appendChild(createSection('Education', educationTiles));

    // Skills Section
    const skillsTile = createTile('Skills', resumeData.skills.join(', '));
    app.appendChild(createSection('Skills', [skillsTile]));
}

// Fetch resume data from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        resumeData = data;
        initApp();
    })
    .catch(error => console.error('Error loading resume data:', error));
