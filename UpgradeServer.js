/** @param {NS} ns */

export async function main(ns) {
    // Upgrade des serveurs
    const maxServersToCheck = 25; // Nombre maximum de serveurs à vérifier
    let serversChecked = 0;

    const servers = ns.getPurchasedServers("home");

    ns.print("Nombre de serveurs : " + servers.length);

    for (const server of servers) {
        if (ns.getServerMaxRam(server) < 2048) {
            ns.print("Mise à niveau du serveur " + server);
            const moneyAvailable = ns.getServerMoneyAvailable("home");
            const upgradeCost = ns.getPurchasedServerUpgradeCost(server, 2048);

            if (moneyAvailable > upgradeCost) {
                ns.print("Mise à niveau du serveur " + server);
                ns.upgradePurchasedServer(server, 2048);

                // Arrêter le script Exploit.js
                const scriptRunning = ns.isRunning("Exploit.js", server);
                if (scriptRunning) {
                    ns.kill("Exploit.js", server);
                }

                serversChecked++;
            }
        }
    }

    ns.run("LaunchServer.js");
}
