let activeDropdown = null;

function toggleDropdown(index) {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  const icons = document.querySelectorAll('.dropdown-header .icon');

  if (activeDropdown === index) {
    dropdowns[index].classList.remove('active');
    icons[index].textContent = '+';
    activeDropdown = null;
  } else {
    dropdowns.forEach((content, i) => {
      content.classList.remove('active');
      icons[i].textContent = '+';
    });
    dropdowns[index].classList.add('active');
    icons[index].textContent = '−';
    activeDropdown = index;
  }
}
