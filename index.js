const calculoDimenciones = (Vdd, Vn, Vp, Vm, unCox, upCox, lmin, cl, tpmax) => {
    const r = (Vdd - Vm - Vp)/(Vm - Vn);
    const WnWpRelation = r * r * (upCox/unCox);

    const k = (Vdd - Vp - (r * Vn))/(r-1);

    const Vil = (2 * Math.sqrt(r) * (Vdd - Vn - Vp))/((r - 1)*(Math.sqrt(r + 3))) - k;
    const Vih = (2 * r * (Vdd - Vn - Vp))/((r - 1)*(Math.sqrt(1 + (3 * r)))) - k;

    const nMh = 1.8 - Vih;
    const nMl = Vil;

    const landap = 2/((7/4) - ((3 * Vp)/Vdd) + Math.pow((Vp/Vdd),2));
    const landan = 2/((7/4) - ((3 * Vn)/Vdd) + Math.pow((Vn/Vdd),2));

    const Wp = ((lmin * cl)/(2 * tpmax * Vdd)) * ((landap/(upCox)) + (landan/(WnWpRelation * unCox)));
    const Wn = Wp * WnWpRelation;

    const tphl = (landan * cl)/(unCox * Vdd * (Wn/lmin));
    const tplh = (landap * cl)/(upCox * Vdd * (Wp/lmin));
    const tp = 0.5 * (tphl + tplh);

    console.log(`r: ${r}`);
    console.log(`Wn/Wp: ${WnWpRelation}`);
    console.log(`Vil: ${Vil}`);
    console.log(`Vih: ${Vih}`);
    console.log(`NMh: ${nMh}`);
    console.log(`NMl: ${nMl}`);
    console.log(`αn: ${landan}`);
    console.log(`αp: ${landap}`);
    console.log(`tphl(ns): ${tphl * Math.pow(10 , 9)}`);
    console.log(`tplh(ns): ${tplh * Math.pow(10 , 9)}`);
    console.log(`tp(ns): ${tp * Math.pow(10 , 9)}`);
    console.log(`Wn(us): ${Wn * Math.pow(10 , 6)}`);
    console.log(`Wp(us): ${Wp * Math.pow(10 , 6)}`);
}

const calcularCaracteristicas = (unCox, upCox, Vn, Vp, Wn, Wp, lmin, Vdd, cl) => {
    
    const r = Math.sqrt((Wn * unCox) / (Wp * upCox));

    
    const Vm = (Vdd - Math.abs(Vp) + (r * Vn)) / (r + 1);
    const VIL = (2 * Math.sqrt(r) * (Vdd - Math.abs(Vp) - Vn)) / ((r - 1) * Math.sqrt(r + 3)) - (((Vdd - Math.abs(Vp)) - (r * Vn)) / (r - 1));
    const VIH = (2 * r * (Vdd - Math.abs(Vp) - Vn)) / ((r - 1) * Math.sqrt(1 + 3 * r)) - (((Vdd - Math.abs(Vp)) - (r * Vn)) / (r - 1));
    const NMh = Vdd - VIH;
    const NMl = VIL;

    const landan = 2 / ((7 / 4) - (3 * Vn / Vdd) + Math.pow(Vn / Vdd, 2));
    const landap = 2 / ((7 / 4) - (3 * Math.abs(Vp) / Vdd) + Math.pow(Math.abs(Vp) / Vdd, 2));
    const tpLH = (landap * cl) / (upCox * (Wp / lmin) * Vdd);
    const tpHL = (landan * cl) / (unCox * (Wn / lmin) * Vdd);
    const tp = (1 / 2) * (tpHL + tpLH);

    
    console.log("\nCaracterísticas estáticas:");
    console.log(`Valor de r: ${r}`);
    console.log(`Valor de Vm: ${Vm} V`);
    console.log(`Valor de VIL: ${VIL} V`);
    console.log(`Valor de VIH: ${VIH} V`);
    console.log(`Valor de NMh: ${NMh} V`);
    console.log(`Valor de NMl: ${NMl} V`);

    console.log("\nCaracterísticas dinámicas:");
    console.log(`Valor de landan: ${landan}`);
    console.log(`Valor de landap: ${landap}`);
    console.log(`Valor de tpLH: ${tpLH * Math.pow(10 , 9)} ns`);
    console.log(`Valor de tpHL: ${tpHL * Math.pow(10 , 9)} ns`);
    console.log(`Valor de tp: ${tp * Math.pow(10 , 9)} ns`);
}

let Vdd = 1.8;
let Vn = 0.35;
let Vp = 0.42;
let Vm = 0.9;
let unCox = 0.000250;
let upCox = 0.000150;
let lmin = 180 * Math.pow(10 , -9);
let cl = 10 * Math.pow(10 , -12);
let tpmax = 1 * Math.pow(10 , -9);

calculoDimenciones(Vdd, Vn, Vp, Vm, unCox, upCox, lmin, cl, tpmax); // no pide Wn ni Wp

let Wn = 2.26 * Math.pow(10 , -6);
let Wp = 1 * Math.pow(10 , -6);
cl = 2 * Math.pow(10 , -12);
calcularCaracteristicas(unCox, upCox, Vn, Vp, Wn, Wp, lmin, Vdd, cl); // mo pide Vm ni tpmax
