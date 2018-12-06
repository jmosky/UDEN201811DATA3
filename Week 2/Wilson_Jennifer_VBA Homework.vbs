' This script accomplished goals outlined in the Moderate level homework.

Sub totalVolume()
    ' Set variables I'd like to use as starting points in my loop.
    summary_ref = 2
    Total = 0
    isExecuted = False
    green = RGB(0, 128, 0)
    red = RGB(255, 0, 0)
    
    ' Create variable for finding the last row in a sheet so this can be used on any worksheet.
    max_row = ActiveSheet.UsedRange.Rows.Count
    
    For Row = 2 To max_row
        ' Set dynamic (changing) variables.
        current_row = Cells(Row, "A").Value
        next_row = Cells(Row + 1, "A").Value
        current_vol = Cells(Row, "G").Value

        If current_row = next_row Then
            ' For each ticker, increment the total volume traded for each new row.
            Total = Total + current_vol
            
            If isExecuted = False Then
                Cells(summary_ref, "M").Value = Cells(Row, "C").Value
                isExecuted = True
            End If
        ElseIf current_row <> next_row Then
            isExecuted = False
            
            ' Set running total of trading volume.
            Cells(summary_ref, "L").Value = Total
            
            ' Set ticker symbol.
            Cells(summary_ref, "I").Value = current_row
            
            ' Set close value.
            Cells(summary_ref, "N").Value = Cells(Row, "F").Value
            
            ' Set annual change. Set Assumes data is in ascending date order.
            Cells(summary_ref, "J").Value = Cells(summary_ref, "M").Value - Cells(summary_ref, "N").Value
            
            ' Calculate annual percent change.
            Cells(summary_ref, "K").Value = (Cells(summary_ref, "M").Value / Cells(summary_ref, "N").Value) - 1
            
            ' Color cells depending on annual percent change: positive/zero or negative.
            If Cells(summary_ref, "K").Value < 0 Then
                Cells(summary_ref, "K").Interior.Color = red
            Else
                Cells(summary_ref, "K").Interior.Color = green
            End If
            
            Total = 0
            summary_ref = summary_ref + 1
        End If
    Next Row
    
    ' Delete columns used to teporarily store annual open and close values.
    Columns("N").EntireColumn.Delete
    Columns("M").EntireColumn.Delete

End Sub