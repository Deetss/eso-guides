EsoCompanion = {}
EsoCompanion.name = "EsoCompanion"
EsoCompanion.SavedVariables = {}

local function OnPlayerActivated()
    local sv = EsoCompanion.SavedVariables
    if not sv then return end
    
    sv.characterName = GetUnitName("player")
    sv.class = GetUnitClass("player")
    sv.cp = GetPlayerChampionPointsEarned()
    
    -- Mount Upgrade Cooldown (Client fallback)
    sv.mountCooldownSeconds = 0
    
    -- Mundus Stone check
    sv.activeMundus = "none"
    local numBuffs = GetNumBuffs("player")
    for i = 1, numBuffs do
        local buffName, _, _, _, _, _, _, _, _, _, abilityId = GetUnitBuffInfo("player", i)
        
        -- Mapping for active player Mundus Stone Buff IDs (ESO Update 50)
        if abilityId == 13975 then sv.activeMundus = "thief"
        elseif abilityId == 13976 then sv.activeMundus = "shadow"
        elseif abilityId == 13977 then sv.activeMundus = "lover"
        elseif abilityId == 13978 then sv.activeMundus = "warrior"
        end
    end

    -- Skills slots front bar
    sv.frontBar = {}
    for slot = 3, 8 do
        local name = GetSlotName(slot, HOTBAR_CATEGORY_PRIMARY)
        table.insert(sv.frontBar, name or "Empty")
    end

    -- Skills slots back bar
    sv.backBar = {}
    for slot = 3, 8 do
        local name = GetSlotName(slot, HOTBAR_CATEGORY_BACKUP)
        table.insert(sv.backBar, name or "Empty")
    end

    -- Equipped gear
    sv.equipment = {}
    local slots = {
        [EQUIP_SLOT_HEAD] = "head",
        [EQUIP_SLOT_SHOULDERS] = "shoulder",
        [EQUIP_SLOT_CHEST] = "chest",
        [EQUIP_SLOT_HANDS] = "hands",
        [EQUIP_SLOT_WAIST] = "waist",
        [EQUIP_SLOT_LEGS] = "legs",
        [EQUIP_SLOT_FEET] = "feet",
        [EQUIP_SLOT_NECK] = "neck",
        [EQUIP_SLOT_RING1] = "ring1",
        [EQUIP_SLOT_RING2] = "ring2",
        [EQUIP_SLOT_MAIN_HAND] = "mainHand",
        [EQUIP_SLOT_OFF_HAND] = "offHand",
        [EQUIP_SLOT_BACKUP_MAIN] = "backBar"
    }

    for slotId, slotName in pairs(slots) do
        local itemLink = GetItemLink(BAG_WORN, slotId)
        if itemLink and itemLink ~= "" then
            local hasSet, setName = GetItemLinkSetInfo(itemLink)
            local traitType = GetItemLinkTraitInfo(itemLink)
            
            -- Translate trait ID to clean name
            local traitName = "None"
            if traitType == ITEM_TRAIT_TYPE_ARMOR_DIVINES or traitType == ITEM_TRAIT_TYPE_WEAPON_PRECISE or traitType == ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY then
                if traitType == ITEM_TRAIT_TYPE_ARMOR_DIVINES then traitName = "Divines" end
                if traitType == ITEM_TRAIT_TYPE_WEAPON_PRECISE then traitName = "Precise" end
                if traitType == ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY then traitName = "Bloodthirsty" end
            else
                traitName = "Other"
            end
            
            sv.equipment[slotName] = {
                setName = hasSet and setName or "None",
                trait = traitName
            }
        else
            sv.equipment[slotName] = {
                setName = "None",
                trait = "None"
            }
        end
    end
end

local function Initialize(eventCode, addonName)
    if addonName ~= EsoCompanion.name then return end
    EVENT_MANAGER:UnregisterForEvent(EsoCompanion.name, EVENT_ADD_ON_LOADED)
    
    -- Load Saved Variables
    EsoCompanion.SavedVariables = ZO_SavedVars:NewAccountWide("EsoCompanionVars", 1, nil, {})
    
    EVENT_MANAGER:RegisterForEvent(EsoCompanion.name, EVENT_PLAYER_ACTIVATED, OnPlayerActivated)
end

EVENT_MANAGER:RegisterForEvent(EsoCompanion.name, EVENT_ADD_ON_LOADED, Initialize)
