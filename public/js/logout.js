function resetLocalStorage(){
  localStorage.removeItem('searchTerm')
  localStorage.removeItem('favorites')
  localStorage.removeItem('beersToTry')
}

const logout = async () => {
    try {
  
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
        resetLocalStorage();
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      alert(err)
    }
    }
  
    document
  .querySelector('#logout')
  .addEventListener('click', logout);