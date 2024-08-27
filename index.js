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

    return [r, WnWpRelation, Vil, Vih, nMh, nMl, landan, landap, tphl, tplh, tp, Wn, Wp];

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

const clickBtnFunction1 = (VddInput, VnInput, VpInput, unCoxInput, upCoxInput, clInput, lminInput, VmInput, tpmaxInput)=>{
    const Vdd = VddInput.value;
    const Vn = VnInput.value;
    const Vp = VpInput.value;
    const Vm = VmInput.value;
    const unCox = unCoxInput.value * Math.pow(10 , -6);
    const upCox = upCoxInput.value * Math.pow(10 , -6);
    const lmin = lminInput.value * Math.pow(10 , -9);
    const cl = clInput.value * Math.pow(10 , -12);
    const tpmax = tpmaxInput.value * Math.pow(10 , -9);  


    const [r, WnWpRelation, Vil, Vih, nMh, nMl, landan, landap, tphl, tplh, tp, Wn, Wp] = calculoDimenciones(Vdd, Vn, Vp, Vm, unCox, upCox, lmin, cl, tpmax);

    const div = document.querySelector("#function1");
    div.classList.add("expanded");
    div.classList.remove("collapsed");
    

    const r_p = document.querySelector("#r1").innerHTML = `- r: ${r}`;
    const WnWpRelation_p = document.querySelector("#wnwp1").innerHTML = `- Wn/Wp: ${WnWpRelation}`;
    const Vil_p = document.querySelector("#vil1").innerHTML = `- Vil: ${Vil}`;
    const Vih_p = document.querySelector("#vih1").innerHTML = `- Vih: ${Vih}`;
    const nMh_p = document.querySelector("#nmh1").innerHTML = `- NMh: ${nMh}`;
    const nMl_p = document.querySelector("#nml1").innerHTML = `- NMl: ${nMl}`;
    const landan_p = document.querySelector("#landan1").innerHTML = `- αn: ${landan}`;
    const landap_p = document.querySelector("#landap1").innerHTML = `- αp: ${landap}`;
    const tphl_p = document.querySelector("#tphl1").innerHTML = `- tphl(ns): ${tphl * Math.pow(10 , 9)}`;
    const tplh_p = document.querySelector("#tplh1").innerHTML = `- tplh(ns): ${tplh * Math.pow(10 , 9)}`;
    const tp_p = document.querySelector("#tp1").innerHTML = `- tp(ns): ${tp * Math.pow(10 , 9)}`;
    const Wn_p = document.querySelector("#wn1").innerHTML = `- Wn(μs): ${Wn * Math.pow(10 , 6)}`;
    const Wp_p = document.querySelector("#wp1").innerHTML = `- Wp(μs): ${Wn * Math.pow(10 , 6)}`;
    
}

window.addEventListener("load",()=>{
    
    const VddInput = document.querySelector("#vdd");
    const VnInput = document.querySelector("#vn");
    const VpInput = document.querySelector("#vp");
    const unCoxInput = document.querySelector("#un");
    const upCoxInput = document.querySelector("#up");
    const clInput = document.querySelector("#cl");
    const lminInput = document.querySelector("#lmin");
    
    
    const VmInput = document.querySelector("#vm");
    const tpmaxInput = document.querySelector("#tpmax");


    const WnInput = document.querySelector("#wn");
    const WpInput = document.querySelector("#wp");

    const btnDimensions = document.querySelector("#dimesions");
    btnDimensions.addEventListener("click", ()=>{
        clickBtnFunction1(VddInput, VnInput, VpInput, unCoxInput, upCoxInput, clInput, lminInput, VmInput, tpmaxInput);
    });
    
});


let Wn = 2.26 * Math.pow(10 , -6);
let Wp = 1 * Math.pow(10 , -6);
cl = 2 * Math.pow(10 , -12);
//calcularCaracteristicas(unCox, upCox, Vn, Vp, Wn, Wp, lmin, Vdd, cl); // mo pide Vm ni tpmax
