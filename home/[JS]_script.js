function toggleManualLuck() {
    const manualLuckCheckbox = document.getElementById("manual-luck");
    const manualLuckContainer = document.getElementById("manual-luck-container");
    const autoContainer = document.getElementById("auto-container");
    const manualLuckValue = document.getElementById("manual-luck-value");
    const bonusRollContainer = document.getElementById("bonus-roll-container");
    const formElements = document.querySelectorAll("#rarity-form select:not(#aura):not(#bonus-roll), #rarity-form input[type='checkbox']:not(#manual-luck):not(#total-luck), #rarity-form input[type='number']:not(#manual-luck-value)");

    manualLuckValue.value = 1;

    if (manualLuckCheckbox.checked) {
        manualLuckContainer.style.display = "block";
        autoContainer.style.display = "none";
        manualLuckValue.disabled = false;
        manualLuckValue.style.color = "";
        bonusRollContainer.style.display = "block";
        formElements.forEach(element => {
            element.disabled = true;
            element.style.color = "gray";
        });
    } else {
        manualLuckContainer.style.display = "none";
        autoContainer.style.display = "block";
        manualLuckValue.disabled = true;
        manualLuckValue.style.color = "gray";
        bonusRollContainer.style.display = "none";
        formElements.forEach(element => {
            element.disabled = false;
            element.style.color = "";
        });
    }
    updateTotalLuck();
}

function manualLuck_validateInput() {
    const input = document.getElementById("manual-luck-value");
    let value = input.value;

    value = value.replace(/[^0-9.,]/g, '');

    if (isNaN(value.replace(',', '.')) || value === '') {
        value = '';
    } else if (parseFloat(value.replace(',', '.')) < 1) {
        value = 1;
    }

    input.value = value;
    updateTotalLuck();
}

function potions_validateSelection() {
    let potions_value = 0;
    const fortunePotions = document.querySelectorAll('input[name="fortune"]:checked');
    const allPotions = document.querySelectorAll('input[name="potions"]:checked, input[name="fortune"]:checked');

    if (fortunePotions.length > 1) {
        alert("You can select only one of the Fortune Potions (Fortune Potion I, Fortune Potion II, Fortune Potion III).");
        fortunePotions[fortunePotions.length - 1].checked = false;
    }

    allPotions.forEach((checkbox) => {
        potions_value += parseFloat(checkbox.value);
    });

    return potions_value;
}

function effects_validateSelection() {
    let other_effects_value = 0;
    const exclusiveEffects = document.querySelectorAll('input[name="exclusiveEffects"]:checked');
    const wbs = document.querySelectorAll('input[name="wbs"]:checked');
    const allEffects = document.querySelectorAll('input[name="effects"]:checked, input[name="exclusiveEffects"]:checked, input[name="wbs"]:checked');

    if (exclusiveEffects.length > 1) {
        alert("You can select only one of the achievement boosts (Skilled, Expert, Master, Grandmaster).");
        exclusiveEffects[exclusiveEffects.length - 1].checked = false;
    }
    if (wbs.length > 1) {
        alert("You can select only one of the Winter Blessings (Winter Blessing, Winter Blessing +).");
        wbs[wbs.length - 1].checked = false;
    }

    allEffects.forEach((checkbox) => {
        other_effects_value += parseFloat(checkbox.value);
    });
    exclusiveEffects.forEach((checkbox) => {
        other_effects_value += parseFloat(checkbox.value);
    });

    return other_effects_value;
}

function res_validateInput() {
    const input = document.getElementById("resonance");
    let value = parseInt(input.value);

    if (isNaN(value) || value < 0) {
        value = 0;
    } else if (value > 39) {
        value = 39;
    }

    input.value = value;
    updateTotalLuck();
}

function friend_validateInput() {
    const input = document.getElementById("friend-count");
    let value = parseInt(input.value);

    if (isNaN(value) || value < 0) {
        value = 0;
    } else if (value > 5) {
        value = 5;
    }

    input.value = value;
    updateTotalLuck();
}

function openChangelog() {
    const width = Math.min(window.innerWidth * 0.8, 800);
    const height = Math.min(window.innerHeight * 0.8, 600);
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open("changelog.html", "Changelog", `width=${width},height=${height},left=${left},top=${top}`);
}

function updateTotalLuck() {
    let totalLuck = 0;
    let playerLuck = 0;

    if (document.getElementById("manual-luck").checked) {
        playerLuck = parseFloat(document.getElementById("manual-luck-value").value.replace(',', '.'));
        totalLuck = playerLuck;
    } else {
        const rightGear = parseFloat(document.getElementById("right-gear").value) || 0;
        const leftGear = parseFloat(document.getElementById("left-gear").value) || 0;
        const potions = potions_validateSelection();
        const finalLuck = parseInt(document.getElementById("final-luck").value) || 0;
        const otherEffects = effects_validateSelection();
        const resonance = parseFloat(document.getElementById("resonance").value) / 100 || 0;
        const friendCount = parseInt(document.getElementById("friend-count").value) || 0;
        const vip = parseFloat(document.getElementById("vip").value) || 1;
        const friendBonus = 0.05 * friendCount;
        const bonusRoll = parseFloat(document.getElementById("bonus-roll").value) || 1;

        playerLuck = (((1 + rightGear + leftGear + friendBonus + potions + otherEffects + resonance) * bonusRoll) + finalLuck) * vip;

        if (document.getElementById("total-luck").checked) {
            playerLuck *= 2;
        }

        totalLuck = playerLuck;
    }

    const decimalSeparator = document.getElementById('decimal-separator-button').innerText;
    const formattedTotalLuck = totalLuck.toFixed(2).replace('.', decimalSeparator);

    document.getElementById("total-luck-display").innerText = `Total Luck: ${formattedTotalLuck}`;
}

function toggleDecimalSeparator() {
    const button = document.getElementById("decimal-separator-button");
    const currentSeparator = button.innerText;
    const newSeparator = currentSeparator === "." ? "," : ".";
    button.innerText = newSeparator;
    updateTotalLuck();
}

function saveFormInputs() {
    console.log("saveFormInputs called");
}

function loadFormInputs() {
    console.log("loadFormInputs called");
}

function showAlert(message) {
    document.getElementById("alert-message").innerText = message;
    document.getElementById("alert-popup").style.display = "block";
    document.body.classList.add("blur");
    document.body.style.pointerEvents = "none"; // Disable background interaction
}

function closeAlert() {
    document.getElementById("alert-popup").style.display = "none";
    document.body.classList.remove("blur");
    document.body.style.pointerEvents = "auto"; // Enable background interaction
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rarity-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let playerLuck;
        let percent;
        let prob;
        let right_left_Gear;
        let bonusRoll;
        let potions_value;
        let other_effects_value;
        let finalLuck;
        let resonance_of_elements;
        let friendCount;
        let vip;
        let friendBonus;

        const manualLuckCheckbox = document.getElementById("manual-luck");

        const nativeRarities = {
            "solar": 5000,
            "lunar": 5000,
            "starlight": 5000,
            "star_rider": 5000,
            "flushed_lobotomy": 69000,
            "hazard_rays": 14000,
            "nautilus": 70000,
            "permafrost": 24500,
            "stormal": 30000,
            "exotic": 99999,
            "diaboli_void": 100400,
            "undead_devil": 20000,
            "comet": 12000,
            "jade": 125000,
            'spectre': 140000,
            'jazz': 160000,
            "aether": 180000,
            "bounded": 200000,
            "celestial": 350000,
            "kyawthuite": 850000,
            "arcane": 1000000,
            "magnetic_reverse_polarity": 1024000,
            "rage_brawler": 1280000,
            "undefined": 1111,
            "astral": 267200,
            "gravitational": 2000000,
            "bounded_unbound": 2000000,
            "virtual": 2500000,
            "savior": 3200000,
            "acquatic_flame": 4000000,
            "poseidon": 1000000,
            "zeus": 4500000,
            "solar_solstice": 500000,
            "galaxy": 500000,
            "lunar_fullmoon": 500000,
            "twilight": 600000,
            "origin": 6500000,
            "hades": 1111111,
            "celestial_divine": 7000000,
            "hyper_volt": 7500000,
            "nihility": 9000,
            "starscourge": 1000000,
            "sailor": 3000000,
            "glitch": 12210110,
            "stormal_hurricane": 4500000,
            "sirius": 1400000,
            "arcane_legacy": 15000000,
            "chromatic": 20000000,
            "aviator": 24000000,
            "arcane_dark": 30000000,
            "ethereal": 35000000,
            "overseer": 45000000,
            "exotic_apex": 49999500,
            "matrix": 50000000,
            "twilight_iridescent_memory": 6000000,
            "sailor_flying_dutchman": 20000000,
            "chromatic_genesis": 99999999,
            "starscourge_radiant": 10000000,
            "overture": 150000000,
            "symphony": 175000000,
            "impeached": 40000000,
            "oppression": 220000000,
            "archangel": 250000000,
            "exotic_void": 299999999,
            "overture_history": 300000000,
            "bloodlust": 50000000,
            "atlas": 90000000,
            "abyssal_hunter": 100000000,
            "gargantua": 43000000,
            "apostolos": 444000000,
            "ruins": 500000000,
            "matrix_overdrive": 503000000,
            "matrix_reality": 601020102,
            "sovereign": 750000000,
            "aegis": 825000000,
            "luminosity": 1200000000,
            "⭐": 1000,
            "⭐⭐": 10000,
            "⭐⭐⭐": 100000,
            "wonderland": 4000000,
            "santa_frost": 15000000,
            "winter_fantasy": 24000000,
            "express": 30000000,
            "abomitable": 40000000,
            "atlas_yuletide": 170000000
        };

        const selectedAuraClass = document.getElementById("aura").selectedOptions[0].className;
        const nativeRarity = nativeRarities[selectedAuraClass] || 1;

        if (manualLuckCheckbox.checked) {
            playerLuck = parseFloat(document.getElementById("manual-luck-value").value.replace(',', '.'));
            bonusRoll = parseFloat(document.getElementById("bonus-roll").value);
            playerLuck *= bonusRoll;
            if (document.getElementById("total-luck").checked) {
                playerLuck *= 2;
            }
        } else {
            potions_value = potions_validateSelection();
            other_effects_value = effects_validateSelection();

            const aura = parseInt(document.getElementById("aura").value);
            right_left_Gear = parseFloat(document.getElementById("right-gear").value);
            bonusRoll = parseFloat(document.getElementById("bonus-roll").value);
            const leftGearValue = document.getElementById("left-gear").value;
            const poleLightCoreDevice = leftGearValue === "pole" ? 5 : 0;
            const leftGear = leftGearValue === "jackpot" ? 0.77 : 0;
            if (poleLightCoreDevice) {
                right_left_Gear += 5;
                bonusRoll = 2;
            }
            if (leftGear) {
                right_left_Gear += 0.77;
                bonusRoll = 2;
            }
            finalLuck = parseInt(document.getElementById("final-luck").value);
            resonance_of_elements = parseFloat(document.getElementById("resonance").value) / 100;
            friendCount = parseInt(document.getElementById("friend-count").value);
            vip = parseFloat(document.getElementById("vip").value);

            friendBonus = 0.05 * friendCount;
            playerLuck = (((1 + right_left_Gear + friendBonus + potions_value + other_effects_value + resonance_of_elements) * bonusRoll) + finalLuck) * vip;

            if (document.getElementById("total-luck").checked) {
                playerLuck *= 2;
            }
        }

        const aura = parseInt(document.getElementById("aura").value);
        percent = 100 * (playerLuck / aura);
        prob = Math.round(1 / (percent / 100));

        const decimalSeparator = document.getElementById('decimal-separator-button').innerText;

        const formattedProb = prob.toString().replace(/\B(?=(\d{3})+(?!\d))/g, decimalSeparator);
        const formattedPercent = percent.toFixed(10).replace('.', decimalSeparator);

        const nativePlayerLuck = playerLuck / nativeRarity;
        const nativePercent = 100 * nativePlayerLuck;
        const nativeProb = Math.round(1 / (nativePercent / 100));
        const formattedNativeProb = nativeProb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, decimalSeparator);
        const formattedNativePercent = nativePercent.toFixed(10).replace('.', decimalSeparator);

        console.log(`
            -------------
            Aura: ${aura}
            Native Aura: ${nativeRarity}
            _-_-_-_-_-_-_
            Right Gear + Left Gear: ${right_left_Gear}
            Bonus Roll: ${bonusRoll}
            Potions: ${potions_value}
            Final Luck: ${finalLuck}
            Other Effects: ${other_effects_value}
            Resonance of Elements: ${resonance_of_elements}
            Friend Count: ${friendCount}
            VIP: ${vip}
            Friend Bonus: ${friendBonus}
            -_-_-_-_-_-_-
            Player Luck: ${playerLuck / bonusRoll}
            Player Luck (with bonus roll): ${playerLuck}
            -------------
        `);

        if (isNaN(percent) || isNaN(prob)) {
            showAlert(`-------------\nRarity %: ${formattedPercent}% \nRarity: 1 in ${aura} \n-_-_-_-_-_-_- \nNative Rarity %: ${formattedNativePercent}% \nNative Rarity: 1 in ${nativeProb} \n-------------`);
        } else {
            showAlert(`-------------\nRarity %: ${formattedPercent}% \nRarity: 1 in ${formattedProb} \n-_-_-_-_-_-_- \nNative Rarity %: ${formattedNativePercent}% \nNative Rarity: 1 in ${formattedNativeProb} \n-------------`);
        }

        saveFormInputs();
    });

    window.onload = function() {
        loadFormInputs();
    };
});
