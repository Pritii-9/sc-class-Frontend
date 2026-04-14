# Frontend Toast/Prompt/Table Improvements TODO

## Current Progress
- [x] Create TODO.md ✅

## Step 1: Create UI Components (Modal & Toast) ✅
- [x] Create `frontend/src/components/ui/Modal.tsx` - Custom modal for login/edit/confirm
- [x] Create `frontend/src/components/ui/Toast.tsx` - Animated toast notifications
- [x] Test: Manual verification in isolation if needed (linter fixed)

## Step 2: Update App.tsx ✅
- [x] Add imports for new UI components
- [x] Add state for modals/toasts (loginModal, editModal, confirmModal, toast state)
- [x] Replace native prompt/alert/confirm with custom modals/toasts in adminLogin, deleteClient, handleAddClient, handleUpdate
- [x] Add Edit button to table with startEdit
- [x] Implement inline edit row or edit modal
- [x] Update Navbar props if needed

## Step 3: Update Navbar.tsx ✅
- [x] Remove duplicate login logic
- [x] Call parent's adminLogin via prop or context

## Step 4: Testing & Polish
- [ ] Test full flow: login → table edit/delete → toasts/modals
- [ ] Responsive checks
- [ ] Update TODO progress
- [ ] Complete task

**Next Step: UI components**

