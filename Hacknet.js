/** @param {NS} ns **/

export async function main(ns) {

    // Fonction pour connaitre l'argent disponible
    function myMoney() {
        ns.print("Home money: " + ns.getServerMoneyAvailable("home"));
        return ns.getServerMoneyAvailable("home");
    }
    // Script pour acheter des serveurs
    // Node = le nombre de serveurs à acheter
    var nodes = 0;
    var ref = 0;

    while (true) {
        // Sleep 1 seconde pour éviter les crashs
        await ns.sleep(1000);
        
        // Si on a plus de la moitié de l'argent nécessaire pour acheter un serveur
        if (ns.hacknet.getPurchaseNodeCost() < myMoney() / 2) {
            ref = ns.hacknet.purchaseNode();
            ns.print("Achat de la node hn-" + ref);
        }
        // Mis à jour des nodes
        nodes = ns.hacknet.numNodes()
        
        for (var i = 0; i < nodes; i++) {
            // On regarde le niveau de la node est un multiple de 10
            var mod = ns.hacknet.getNodeStats(i).level % 10;

            // Level
            if (ns.hacknet.getLevelUpgradeCost(i, 10 - mod) < myMoney() / 2) {
            ns.hacknet.upgradeLevel(i, 10 - mod);
            ns.print("node hn-" + i + " leveled up");
            }
            // Ram
            if (ns.hacknet.getRamUpgradeCost(i) < myMoney() / 2) {
            ns.hacknet.upgradeRam(i);
            ns.print("node hn-" + i + " ram upgraded");
            }
            // Core
            if (ns.hacknet.getCoreUpgradeCost(i) < myMoney() / 2) {
            ns.hacknet.upgradeCore(i);
            ns.print("node hn-" + i + " core upgraded");
            }
        }
    }
}