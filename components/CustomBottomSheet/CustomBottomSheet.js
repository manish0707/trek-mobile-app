import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';

export default function CustomBottomSheet({
  getRefValue,
  closeOnBackdopPress = true,
  defaultOpen = false,
  enablePanDownToClose = true,
  height = '95%',
  onBackDropPress,
  children,
}) {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => [1, height], [height]);

  useEffect(() => {
    if (getRefValue) {
      getRefValue(bottomSheetRef.current);
    }
  }, [getRefValue]);

  const BackdropComponent = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={closeOnBackdopPress ? 'close' : 'none'}
        onPress={onBackDropPress}
      />
    ),
    [closeOnBackdopPress],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={BackdropComponent}
      enablePanDownToClose={enablePanDownToClose}
      enableContentPanningGesture={enablePanDownToClose}
      enableHandlePanningGesture={enablePanDownToClose}
      index={defaultOpen ? 1 : -1}
      snapPoints={snapPoints}>
      {children}
    </BottomSheet>
  );
}
