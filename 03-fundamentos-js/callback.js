// setTimeout( function (){
//     console.log("Hola Mundo");
// }, 1000);

// setTimeout( () => {
//     console.log("Hola Mundo");
// }, 1500);

const getUserById = (id, callback) => {
    const user = {
        // id = id
        id,
        name: 'Jorge'
    }


    setTimeout( () => {
        callback(user);
    }, 1500)

}

getUserById(10, (user) => {
    console.log(user.name.toUpperCase());
});