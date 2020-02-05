const abtn = document.querySelector('#aleee');
const btnG = document.querySelector('.btn-gg');

btnG.addEventListener('click', e => {
    const target = e.target.closest('button');
    if(!target) return;
    if(target.id == 'aleee') {
        alert('hahaha');
    }
})
// abtn.addEventListener('click', ()=>{
//     alert('hahah');
// })