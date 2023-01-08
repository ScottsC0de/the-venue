module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    isOnMainStage: () => {
      if (document.location === '/'){
        return true;
      }
    },
    isOnBackStage: () => {
      if (document.location === '/spotify'){
        return true;
      }
    }
  };
  