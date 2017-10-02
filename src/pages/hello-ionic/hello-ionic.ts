import { Component } from '@angular/core';
import { AlertController } from "ionic-angular";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})




export class HelloIonicPage {
    numFallos: number;
    numAciertos: number;

    readonly LETRAS: string[] = ["A", "B", "C", "D", "E", "F", "G",
                                 "H", "I", "J", "K", "L", "M", "N",
                                 "Ñ", "O", "P", "Q", "R", "S", "T",
                                 "U", "V", "W", "X", "Y", "Z", "*"];

    readonly PALABRAS: string[] = ["PALABROTA", "BAIFO", "CHIVI", "RELENGAR"];

    botones: Array<{ letra: string, estado: string }>;

    palabraAAdivinar: string;
    palabraAdivinadaPorAhora: string;

    constructor(public alertCtrl: AlertController) {
        this.inicializar();
    }

    inicializar(): void {
        this.numFallos = 0;
        this.numAciertos = 0;

        this.inicializarPalabraAAdivinar();
        this.inicializarPalabraAdivinadaPorAhora();

        this.inicializarBotones();
    }

    inicializarBotones(): void {
        this.botones = [];
        
        for (let i = 0; i < this.LETRAS.length; i++) {
            this.botones.push({
                letra: this.LETRAS[i],
                estado: "letra-sin-pulsar"
            });
        }
    }

    inicializarPalabraAdivinadaPorAhora(): void {
        this.palabraAdivinadaPorAhora = "";

        for (let i = 0; i < this.palabraAAdivinar.length; i++) {
            this.palabraAdivinadaPorAhora += "-";
        }
    }

    inicializarPalabraAAdivinar(): void {
        let aleatorio = Math.floor(Math.random() * this.PALABRAS.length);
        this.palabraAAdivinar = this.PALABRAS[aleatorio];
    }

    botonClicked(boton: { letra: string, estado: string }): void{
        if (this.seHaAcertado(boton.letra)) {
            //this.numAciertos++;
            boton.estado = "letra-pulsada-acertada";
            if (this.numAciertos == this.palabraAAdivinar.length) {
                this.showAlert("Has ganado", "Pulsa Ok para continuar", "Ok");
            }
        } else {
            boton.estado = "letra-pulsada-no-acertada";
            this.numFallos++;
            if (this.numFallos == 6) {
                this.showAlert("Has perdido", "Pulsa Ok para continuar", "Ok");
            }
        }
    }

    seHaAcertado(letra: string): boolean {
        let acierto = false;

        for (let i = 0; i < this.palabraAAdivinar.length; i++) {
            if (letra == this.palabraAAdivinar.substr(i, 1)) {
                this.palabraAdivinadaPorAhora = this.palabraAdivinadaPorAhora.substr(0, i) + letra + this.palabraAdivinadaPorAhora.substr(i + 1);
                this.numAciertos++;
                acierto = true;
            }
        }
        return acierto;
    }

    showAlert(titulo: string, subTitulo: string, boton: string) {
        // let mensaje = "Ha pulsado la letra " + letra
        let alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subTitulo,
            buttons: [{
                text: boton,
                handler: () => {
                    this.inicializar();
                }
            }]
        });
        alert.present();
    }
}
