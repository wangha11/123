export default {
    add({commit},nameObj){
       commit('add',nameObj)
    },
    del({commit},id){
        commit('del',id)
    },
    delet({commit}){
        commit('delet')
    },
    quanxuan({commit},chek){
        commit('quanxuan',chek)
    }
}