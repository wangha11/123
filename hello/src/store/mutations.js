export default {
    add(state,nameObj){
      state.stundtList.push(nameObj)
    },
    del(state,id){
        state.stundtList.map((v,i)=> {
            if(v.id == id){               
             state.stundtList.splice(i,1)
            }
          })
    },
    delet(state){
        state.stundtList =  state.stundtList.filter(r=>{
              return  r.done == false
        })
    },
    quanxuan(state,chek){
        state.stundtList.forEach(r=>{
            r.done = chek
        })
    }
}