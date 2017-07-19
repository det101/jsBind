/**
 * Created by luxiaolong on 2017/7/18.
 */
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

var iAnimations = [];

const FPS = 30;
var perTime;
var nowTime;
const FPS_TIME = 1000 / FPS;
var isRun = false;
class EnterFrame {

    static addAnimation(iAnimation) {
        if(iAnimations.indexOf(iAnimation) == -1) {
            iAnimations.push(iAnimation);
        }
        if(iAnimations.length > 0) {
            if(!isRun) {
                isRun = true;
                EnterFrame.enter();
            }
        }
    }

    static remove(iAnimation) {
        let index = iAnimations.indexOf(iAnimation);
        if(index != -1) {
            iAnimations.splice(index, 1);
        }
    }

    static enter() {
        if(window.requestAnimationFrame) {
            requestAnimationFrame(EnterFrame.enter);
            if(!perTime) {
                perTime = Date.now();
            }
            nowTime = Date.now();
            let delta = nowTime - perTime;
            if(delta >= FPS_TIME) {
                perTime = nowTime - (delta % FPS_TIME);
                EnterFrame.do();
            }
        } else {
            EnterFrame.do();
            setTimeout(this.enter, FPS);
        }
    }

    static do() {
        iAnimations.forEach((item) => {
            if(item.update) {
                item.update();
            }
        });
    }
}

export default EnterFrame;