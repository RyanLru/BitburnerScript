/** @param {NS} ns **/
export async function main(ns) {
    // Script pour Afficher un menu de gestion des Scripts
    // 1 - Supprimer les serveurs (DeleteServer.js)

    const choixOptions = ["0", "1", "2"];
    const choix = await ns.prompt(" 1 - Supprimer les Serveur \n 2 - Lancer les exploites \n 0 - Quitter le Menu", {
            type: "select",
            choices: choixOptions
    });

    switch (choix) {
          case "1":
                ns.run("DeleteServer.js");
              break;
          case "2":
                ns.run("Exploit.js", {threads:195});
              break;
          case "0":
              ns.tprint("Programme terminé.");
              return;
    }
}