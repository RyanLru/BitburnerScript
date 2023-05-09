export async function main(ns) {
    const desiredNodes = 256;
    let nodeCount = await ns.hacknet.numNodes();
    let i = 13;

    while (nodeCount < desiredNodes) {

        await ns.sleep(1000);
        await ns.print("Node n° " + i);

        while (await ns.hacknet.getNodeStats(i).level < 200) {

            const cost = await ns.hacknet.getLevelUpgradeCost(i, 1);
            if (ns.getServerMoneyAvailable('home') < cost) {
                await ns.print("Besoin de $" + cost + " . à $" + ns.getServerMoneyAvailable('home'));
                await ns.sleep(3000);
            }

            if (await ns.hacknet.getPurchaseNodeCost() > ns.getServerMoneyAvailable('home')) {
                await ns.hacknet.upgradeLevel(i, 10);
                break;
            }

        }

        while (await ns.hacknet.getNodeStats(i).ram < 64) {
            const cost = await ns.hacknet.getRamUpgradeCost(i, 1);
            if (ns.getServerMoneyAvailable('home') < cost) {
                await ns.print("Besoin de $" + cost + " . à $" + ns.getServerMoneyAvailable('home'));
                await ns.sleep(3000);
            }

            if (await ns.hacknet.getPurchaseNodeCost() > ns.getServerMoneyAvailable('home')) {
                await ns.hacknet.upgradeRam(i, 2);
                break;
            }

        }

        while (await ns.hacknet.getNodeStats(i).cores < 16) {
            const cost = await ns.hacknet.getCoreUpgradeCost(i, 1);

            if (ns.getServerMoneyAvailable('home') < cost) {
                await ns.print("Besoin de $" + cost + " . à $" + ns.getServerMoneyAvailable('home'));
                await ns.sleep(3000);
            }

            if (await ns.hacknet.getPurchaseNodeCost() > ns.getServerMoneyAvailable('home')) {
                await ns.hacknet.upgradeCore(i, 1);
                break;
            }

        }

        if (await ns.hacknet.getNodeStats(i).level == 200 && await ns.hacknet.getNodeStats(i).ram == 64 && await ns.hacknet.getNodeStats(i).cores == 16 && await ns.hacknet.getPurchaseNodeCost() > ns.getServerMoneyAvailable('home')) {
            nodeCount += 1;
            i += 1;
            await ns.hacknet.purchaseNode();
        }

    }
}