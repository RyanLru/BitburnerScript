/** @param {NS} ns **/
export async function main(ns) {
    var purchasedServers = ns.getPurchasedServers();

    for (var i = 0; i < purchasedServers.length; i++) {

        var server = purchasedServers[i];
                // on recup chaque serveur acheter et on le delete 
        if (!ns.deleteServer(server)) {
            ns.tprint("Échec de la suppression du serveur : " + server);
        } else {
            ns.tprint("Serveur supprimé : " + server);
        }
    }
}