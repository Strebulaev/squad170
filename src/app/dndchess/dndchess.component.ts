import { Component } from '@angular/core';

interface Piece {
  name: string;
  number: number;
  minHealth: number;
  maxHealth: number;
  health: number;
  minInitiative: number;
  maxInitiative: number;
  initiative: number;
  damage?: number;
  weapon?: string; 
  spells?: string[]; 
  isParalyzed?: boolean; 
  isPoisoned?: boolean; 
  spellMenuOpen?: boolean;
  weaponInfo?: string;
}

@Component({
  selector: 'app-dndchess',
  templateUrl: `./dndchess.component.html`,
  styleUrls: ['./dndchess.component.css'], 
})
export class DndchessComponent {
  pieces: Piece[] = [
    { name: "Пешка", number: 1, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 2, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 3, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 4, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 5, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 6, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 7, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Пешка", number: 8, minHealth: 0, maxHealth: 3, health: 3, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Слон", number: 1, minHealth: 0, maxHealth: 5, health: 5, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Слон", number: 2, minHealth: 0, maxHealth: 5, health: 5, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Конь", number: 1, minHealth: 0, maxHealth: 5, health: 5, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Конь", number: 2, minHealth: 0, maxHealth: 5, health: 5, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Ферзь", number: 1, minHealth: 0, maxHealth: 5, health: 5, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] },
    { name: "Король", number: 1, minHealth: 0, maxHealth: 4, health: 4, minInitiative: 0, maxInitiative: 4, initiative: 2, spells: ["Паралич", "Отравление"] }
  ];

  nextTurn() {
    for (let piece of this.pieces) {
      if (piece.initiative > 3) {
        piece.initiative = 2;
      }

      if (piece.isPoisoned) {
        piece.health -= 1; 
      }

      piece.isParalyzed = false; 
      piece.isPoisoned = false; 
    }
  }

  toggleSpellMenu(piece: Piece) {
    piece.spellMenuOpen = !piece.spellMenuOpen; 
  }

  castSpell(piece: Piece, spell: string) {
    piece.spellMenuOpen = false; 
    console.log(spell); 

    if (spell === "Паралич") {
      piece.isParalyzed = true; 
    } else if (spell === "Отравление") {
      piece.isPoisoned = true; 
    }
  }

  showWeaponInfo(event: any, piece: Piece) {
    const select = event.target.previousElementSibling;
    const selectedWeapon = select.value;

    const weaponInfo = this.getWeaponInfo(selectedWeapon);
    piece.weaponInfo = weaponInfo;

    setTimeout(() => {
      piece.weaponInfo = ''; 
    }, 4000);
  }


  getWeaponInfo(selectedWeapon: string): string {
    let weaponInfo = "";

    switch (selectedWeapon) {
      case "Алебарда":
        weaponInfo = "Алебарда – оружие с длинной рукояткой и лезвием, наносит 1к4 рубящего урона.";
        break;
      case "Боевая кирка":
        weaponInfo = "Боевая кирка – оружие с крепкой рукоятью и острым острием, наносит 1к4 + 2 колющего урона.";
        break;
      case "Двуручный меч":
        weaponInfo = "Двуручный меч – огромное оружие, требующее двух рук, наносит 2к4 - 2 рубящего урона, а также при первом ударе накладывает состояние отравления.";
        break;
      case "Нунчаки":
        weaponInfo = "Нунчаки – два связанных между собой бруска, наносящих 1к8 - 3 дробящего урона.";
        break;
      case "Эльфийский дуэльный клинок":
        weaponInfo = "Эльфийский дуэльный клинок – изящное оружие эльфов, наносящее 2к4 - 2 рубящего урона, а также при первом ударе накладывает состояние паралича.";
        break;
      default:
        weaponInfo = "";
        break;
    }

    return weaponInfo;
  }
}
