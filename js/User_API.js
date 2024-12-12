class User_API{
    static API_URL(){return "http://localhost:5000/accounts/";}
    static GetUser_Url(){return "http://localhost:5000/accounts/";}

    
    static async API_GetUsers() {
        return new Promise(resolve => {
            $.ajax({
                method:"get",
                url: "http://localhost:5000/api/accounts",
                headers: {
                    "Authorization": `Bearer ${ConnectedToken}`
                },
                success: users => resolve(users),
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }

    static async API_SaveUser(User, create) {
        console.log(User);
        return new Promise(resolve => {
            $.ajax({
                url: create ? (this.API_URL() + "register") :  this.API_URL() + "modify",
                type: create ? "POST" : "PUT",
                contentType: 'application/json',
                headers: {
                    "Authorization": `Bearer ${ConnectedToken}`
                },
                data: JSON.stringify(User),
                success: (/*data*/) => { create ? $("#VerifyConnectInfo").text("Votre compte a été créé. Veuillez prendre votre courriels pour récupérer votre code de vérification qui vous sera demandé lors de votre prochaine connexion"):  resolve(true); },
                error: (xhr) => {console.log(xhr.responseJSON.error_description); resolve(false /*xhr.status*/); }
            });
    });
    }

    static async API_DeleteUser(id) {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + "remove/" + id,
                type: "GET",
                headers: {
                    "Authorization": `Bearer ${ConnectedToken}`
                },
                success: () => { currentHttpError = ""; resolve(true); },
                error: (xhr) => { currentHttpError = xhr.responseJSON.error_description; resolve(false /*xhr.status*/); }
            });
        });
    }

    static async BlockUser(id){
        $.ajax({
            type: "POST",
            url: this.API_URL() + "block/" + id,
            success: function (response) {
                
            }
        });
    }
    static async PromoteUser(id){
        $.ajax({
            type: "POST",
            url: this.API_URL() + "promote/" + id,
            success: function (response) {
                
            }
        });
    }
}
