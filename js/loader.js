export function showLoaderUI(){
    const loader = document.createElement('div');
    loader.classList.add('loader','animate__animated','animate__fadeIn');
    loader.innerHTML = `
    <div style="background-color: #ffffffdd" class="min-vh-100 d-flex justify-content-center fixed-top align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    `;
    document.body.append(loader);
}

export function removeLoaderUI(){
    let currentLoader = document.querySelector(".loader");
    currentLoader.classList.replace("animate__fadeIn","animate__fadeOut");
    currentLoader.addEventListener("animationend",_=>currentLoader.remove());
}
