/** @param {NS} ns */

export async function main(ns) {
    const maxServersToCheck = 25; // Nombre maximum de serveurs à vérifier
    let serversChecked = 0;

    const servers = ns.getPurchasedServers("home");

    for (const server of servers) {
        if (serversChecked >= maxServersToCheck) {
            break; // Sortir de la boucle après avoir vérifié le nombre maximal de serveurs
        }

        ns.print(`Calcul des threads maximum pour le serveur ${server}`);

        // Récupérer les ressources du serveur
        const serverRam = ns.getServerMaxRam(server);
        const scriptCost = ns.getScriptRam("Exploit.js");

        // Calculer le nombre de threads maximum pouvant être exécutés sur le serveur
        const maxThreads = Math.floor(serverRam / scriptCost);
        ns.print(`Lancement du script Exploit.js sur le serveur ${server} avec ${maxThreads} threads`);

        // Lancer le script Exploit.js avec le nombre maximum de threads calculé
        ns.exec("Exploit.js", server, maxThreads);

        serversChecked++;
    }
}
