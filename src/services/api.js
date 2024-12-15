export const mockApi = {
  async getOffices() {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      { id: 1, name: "Office 1", distance: 3 },
      { id: 2, name: "Office 2", distance: 2 },
      { id: 3, name: "Office 3", distance: 11 },
    ];
  }
};


