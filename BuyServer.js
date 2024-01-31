/** @param {NS} ns */

export async function main(ns) {
    // Achat des serveurs
    var i = 1;
    while (true) {
        const moneyAvailable = ns.getServerMoneyAvailable("home");
        const serverCost = ns.getPurchasedServerCost(512);

        if (moneyAvailable / 2 > serverCost) {
            ns.print("Achat d'un serveur");
            const serverName = "Server-Exploit-" + i;
            
            ns.purchaseServer(serverName, 512);
            ns.scp("Exploit.js", serverName, "home");
            ns.exec("Exploit.js", serverName, 195);
            
            i++;
        }
    }
}
