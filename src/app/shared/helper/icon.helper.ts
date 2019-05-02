export class Icone {
    CodIcone;
    IdIcone;
    DescIcone;
    Caminho;

    constructor(cod: string, desc: string) {
        this.CodIcone = cod;
        this.DescIcone = desc;
        this.Caminho = 'assets/img/icones/' + this.CodIcone + '.svg';
    }

    obterCaminho() {
        return 'assets/img/icones/' + this.CodIcone + '.svg';
    }
}
