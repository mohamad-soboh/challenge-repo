


// beforeAll(()=>{
//     console.log("excuted ones before all as init ")
// })
// beforeEach(()=>{
//     console.log('before each ')

//     animals = ['cow','cat','dog','tiger'];
// })

// afterEach(()=>{
//     console.log('after each ')
// })
// afterAll(()=>{
//     console.log("excuted ones after all  ")
// })

describe("animals array",()=>{
    beforeEach(()=>{
        console.log('before each ')
    
        animals = ['cow','cat','dog','tiger'];
    })
      it("should add a new animal to end of array",()=>{
        animals.push('aligator');
        expect(animals[animals.length-1])
      })
      it("should add a new animal to beginning  of array",()=>{
        animals.unshift('monkey');
        expect(animals[0]).toBe('monkey')
      })
      it("should have inital length  of 4",()=>{
        expect(animals.length).toBe(4)
      })
  
})
describe("testing somthing else",()=>{
    it("true should be truthy",()=>{
      expect(true).toBeTruthy()
    })
})