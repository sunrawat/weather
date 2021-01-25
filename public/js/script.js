console.log('Loding JS...')
getLocationByAddress = ((address)=>{
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    fetch('/weather?address='+ address).then((response)=> {
        response.json().then((data)=> {
            if(data.err) {
                console.log('error in loading')
                msg1.textContent = data.err;
            }else{ 
                msg1.textContent = data.forecast;
                msg2.textContent = data.temprature;
            }
        })
    }).catch((e)=> msg1.textContent = e);
});



const wf = document.querySelector('form');
const address = document.querySelector('#address');
const msg1 = document.querySelector('#msg1');

const msg2 = document.querySelector('#msg2');

wf.addEventListener('submit', (e) =>  {
    e.preventDefault();
    getLocationByAddress(address.value);
})