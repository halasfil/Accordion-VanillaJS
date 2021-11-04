let expandSection = (section, sectionContent) => {
  section.addEventListener('click', () => {
    sectionContent.classList.contains('toggle')
      ? sectionContent.classList.remove('toggle')
      : sectionContent.classList.add('toggle');
    !sectionContent.classList.contains('toggle')
      ? section.classList.add('activeSection')
      : section.classList.remove('activeSection');
  });
};

let handleClick = (section, contentP) => {
  section.addEventListener('click', () => {
    const request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text'
    );
    request.onprogress = () => {
      contentP.classList.add('loading');
    };
    request.onload = () => {
      contentP.classList.remove('loading');
      request.status == '200'
        ? (contentP.innerText = request.responseText)
        : (contentP.innerText = `${request.status} Something went wrong`);
    };
    if (section.classList.contains('activeSection')) {
      request.send();
    }
  });
};

let createAjaxSection = (dL) => {
  const ajaxSection = document.createElement('dt');
  ajaxSection.innerText = 'Ajax section';
  ajaxSection.setAttribute('id', 'ajaxSection');
  dL.appendChild(ajaxSection);
  const ajaxContent = document.createElement('dd');
  ajaxContent.classList.add('toggle');
  ajaxContent.setAttribute('id', 'ajaxContent');
  dL.appendChild(ajaxContent);
  const ajaxP = document.createElement('p');
  ajaxContent.appendChild(ajaxP);
  expandSection(ajaxSection, ajaxContent);
  handleClick(ajaxSection, ajaxP);
};

let makeAccordeon = (numberOfSections) => {
  window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const dL = document.createElement('dl');
    dL.setAttribute('id', 'dl');
    root.appendChild(dL);
    for (let i = 0; i < numberOfSections; i++) {
      const sectorValue = i + 1;
      const dT = document.createElement('dt');
      const dD = document.createElement('dd');
      const p = document.createElement('p');
      dT.innerText = `Section ${sectorValue}`;
      dT.setAttribute('id', 'dt ' + sectorValue);
      dD.classList.add('toggle');
      expandSection(dT, dD);
      dD.setAttribute('id', 'dd ' + sectorValue);
      p.innerText = `Section ${sectorValue} Content...`;
      dD.appendChild(p);
      dL.appendChild(dT);
      dL.appendChild(dD);
    }
    createAjaxSection(dL);
  });
};

makeAccordeon(3);
