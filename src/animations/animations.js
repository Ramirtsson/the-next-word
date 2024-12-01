
export class animotions extends Phaser.Scene{

    constructor(){
        super({key:'animotions'});
    }

    anim_swing(scene,object,config=null){
        //config.start
        //config.duration
        //config.repeat

        if (config) {
            if (!config.repeat) {
                config.repeat=-1
            }
        }

        scene.tweens.add({
            targets: [object],           // El objeto que se va a mover
            x: config.start,                         // La posición final (eje x)
            duration: config.duration,                 // Duración en milisegundos (ajustar según preferencia)
            ease: 'Sine.easeInOut',         // Tipo de suavizado (Sine.easeInOut hace que el movimiento sea fluido)
            yoyo: true,                     // Activa el efecto de ida y vuelta
            repeat: config.repeat                      // Repetir indefinidamente
        });
    }

    anim_heartbeat(scene,object,config=null){
        //config.scale
        //config.duration
        //config.repeat

        if (config) {
            if (!config.repeat) {
                config.repeat=-1
            }
        }

        scene.tweens.add({
            targets: [object],           // El objeto que se va a mover
            scale: config.scale,                         // La posición final (eje x)
            duration: config.duration,                 // Duración en milisegundos (ajustar según preferencia)
            ease: 'Sine.easeInOut',         // Tipo de suavizado (Sine.easeInOut hace que el movimiento sea fluido)
            yoyo: true,                     // Activa el efecto de ida y vuelta
            repeat: config.repeat                     // Repetir indefinidamente
        });

    }





    
}