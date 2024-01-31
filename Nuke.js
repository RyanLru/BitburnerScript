/** @param {NS} ns */

var alreadyNuked = [];

export async function main(ns) {
    await attackTargets(ns, ns.getHostname());
}

export async function RootAccess(ns, target) {
    await attackTargets(ns, target);
}

async function attackTargets(ns, target) {
    if (ns.hasRootAccess(target) || alreadyNuked.includes(target)) {
        return; // Ne pas attaquer une cible déjà attaquée ou déjà détruite
    }

    var targets = ns.scan(target);

    for (var subTarget of targets) {
        await attackTarget(ns, subTarget);
    }
}

async function attackTarget(ns, target) {
    var numberPorts = ns.getServerNumPortsRequired(target);

    switch (numberPorts) {
        case 0:
            await ns.nuke(target);
            break;
        case 1:
            await ns.brutessh(target);
            await ns.nuke(target);
            break;
        case 2:
            await ns.brutessh(target);
            await ns.ftpcrack(target);
            await ns.nuke(target);
            break;
        case 3:
            await ns.brutessh(target);
            await ns.ftpcrack(target);
            await ns.relaysmtp(target);
            await ns.nuke(target);
            break;
        case 4:
            await ns.brutessh(target);
            await ns.ftpcrack(target);
            await ns.relaysmtp(target);
            await ns.httpworm(target);
            await ns.nuke(target);
            break;
        case 5:
            await ns.brutessh(target);
            await ns.ftpcrack(target);
            await ns.relaysmtp(target);
            await ns.httpworm(target);
            await ns.sqlinject(target);
            await ns.nuke(target);
            break;
        // Ajoutez d'autres cas au besoin
    }

    ns.print("Nuked " + target);
    alreadyNuked.push(target);

    // Appel récursif pour attaquer les sous-cibles
    await attackTargets(ns, target);
}
