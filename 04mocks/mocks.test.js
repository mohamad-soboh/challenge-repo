const forEach = (items, callback) => {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
};

it("mock callback", () => {
  const mockCalledBack = jest.fn((x) => 42 + x);
  forEach([0, 1, 3], mockCalledBack);
  expect(mockCalledBack.mock.calls.length).toBe(3);

  expect(mockCalledBack.mock.calls[0][0]).toBe(0);

  expect(mockCalledBack.mock.calls[1][0]).toBe(1);

  expect(mockCalledBack.mock.calls[2][0]).toBe(3);

  expect(mockCalledBack.mock.results[0].value).toBe(42);

  expect(mockCalledBack.mock.results[1].value).toBe(43);

  expect(mockCalledBack.mock.results[2].value).toBe(45);
});


it("mock callback return ", () => {
    const mock = jest.fn()
     mock
     .mockReturnValueOnce(true)
     .mockReturnValueOnce(false)
     .mockReturnValueOnce('hello')
     
     const results1 =mock();
     const results2 =mock();
     const results3 =mock();

     expect(results1).toBeTruthy();
     expect(results2).toBeFalsy();
     expect(results3).toBe('hello');
  });



const axios = require('axios');

const fetchData = async (id) => {
    const results = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return results.data
  };



  //this mock the http req and not actualy call it 
it("mock axios ", async() => {
    jest.spyOn(axios, "get").mockReturnValueOnce({
        data:{
            id: 1,
            todo: "do that",
        }
    })
    const results = await fetchData(1)
    expect(results.todo).toBe("do that")
  });