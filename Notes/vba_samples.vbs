' Rule of thumb: sub procedure, variables, functions
' variables
' computation
' messaging / condition

sub sayHello()
    MsgBox("Hi There")
end sub

' ------------------------------------------------------------------

Sub putDataIntoSheet()
    cells(1,1).Value = "jeffrey"
    cells(1,2).Value = "james"
    range("C1:c10").Value = 10
End Sub
    
Sub assign_names()
    range("A2:H2").Values = "Pawn"
End Sub

' ------------------------------------------------------------------

Sub computeTotal()

    ' Dim price as Integer
    
    price = Cells(2, 2).Value
    quantity = Cells(2, 3).Value
    pretax_total = price * quantity

    If pretax_total > 100 Then
        tax_rate = 0.08
    Else
        tax_rate = 0.05
    End If
    
    total_amount = price * quantity * (1 + tax_rate)
    
    Cells(2, 4).Value = total_amount
    
End Sub

' ------------------------------------------------------------------
' ------------------------------------------------------------------

Sub parser()
    sentence = Cells(4, 2).Value
    Words = Split(sentence)
    Cells(7, 3).Value = Words(Cells(7, 2) - 1)
    Cells(8, 3).Value = Words(Cells(8, 2) - 1)
    Cells(9, 3).Value = Words(Cells(9, 2) - 1)
    ' MsgBox (Words(2))
End Sub

' ------------------------------------------------------------------

Sub parser()
    sentence = Cells(4, 2).Value
    Words = Split(sentence)
    
    ' Dim rng As Range
    Set rng = Range("B7:B9")
    For Each cell In rng
        cell.Offset(, 1).Value = Words(cell - 1)
    Next cell
End Sub

' ------------------------------------------------------------------

Sub printnums()
    For row_index = 16 To 100
        Cells(row_index, 1).Value = row_index
        Cells(row_index, 2).Value = row_index - 15
        ' Does not work.
        Cells(row_index, 3).Value = sum(range(row_index:row_index.offset(,2)))
    Next row_index  
End Sub

' ------------------------------------------------------------------

Sub dosomething()

rand_val = Rnd()

For row = 1 to 100
    Cells(row, 1).Value = Rnd() * 100
    ' This next line will set the same value every time.
    Cells(row, 2).Value = rand_val
Next Row

End Sub

' ------------------------------------------------------------------

Sub budget_checker()
    budget = Cells(3, 3).Value
    Price = Cells(3, 6).Value
    fees = Cells(3, 8).Value
    Total = Price * (1 + fees)
    Cells(3, 12).Value = Total

    If Total > budget Then
        MsgBox ("Over budget! $" & budget - Total)
    Else
        MsgBox ("Under or at budget. Good work! $" & budget - Total)
    End If
    
End Sub

' ------------------------------------------------------------------

Sub iterateOver()
    for row = 1 to 20
        Cells(row, 1).value = 
    next row
End Sub

' ------------------------------------------------------------------

Sub iterateOver()

subtotal = 0

    For row = 1 To 20
        Cells(row, row).Value = row
        Subtotal = Subtotal + 10
    Next row

    msgbox(cstr(subtotal))
End Sub

' ------------------------------------------------------------------

Sub textme()
    for x = 1 to 10
        msgBox("hey there" & " " & x * 10)
    next x
End Sub

' ------------------------------------------------------------------

Sub chickenuggs()
    nuggMin = 2
    nuggMax = 12
    nuggExcess = 50

    For i = nuggMin To nuggExcess
        Cells(i, 2).Value = i
        Cells(i, 3).Value = "chicken nuggets."

        if Cells(i, 2).Value > nuggMax Then
            Cells(i, 1).Value = "I will not eat"
        else Cells(i, 1).Value = "I will eat"
        end if
    Next i
    
End Sub

' ------------------------------------------------------------------

Sub chickenuggs()
    nuggMin = 2
    nuggMax = 12
    nuggExcess = 50

    For i = nuggMin To nuggExcess
        Cells(i, 1).Value = "I will eat"
        Cells(i, 2).Value = i
        Cells(i, 3).Value = "chicken nuggets."
    Next i
End Sub

' ------------------------------------------------------------------

Sub nuggets()
    For nugget = 4 To 20
    If nugget < 9 Then
        Cells(nugget, 1).Value = "I def love to eat"
        Cells(nugget, 2).Value = nugget
        Cells(nugget, 3).Value = "chicken nuggets."
    ElseIf nugget < 12 Then
        Cells(nugget, 1).Value = "I MAY eat"
        Cells(nugget, 2).Value = nugget
        Cells(nugget, 3).Value = "chicken nuggets."
    Else
        Cells(nugget, 1).Value = "I WILL NOT eat"
        Cells(nugget, 2).Value = nugget
        Cells(nugget, 3).Value = "chicken nuggets."
    End If
    Next nugget
End Sub

' ------------------------------------------------------------------

Sub fizzbuzz()
    For Number = 1 To 100
        If Number Mod 3 = 0 And Number Mod 5 = 0 Then
            Cells(Number, 2).Value = "FizzBuzz"
        ElseIf Number Mod 3 = 0 Then
            Cells(Number, 2).Value = "Fizz"
        ElseIf Number Mod 5 = 0 Then
            Cells(Number, 2).Value = "Buzz"
        Else: Cells(Number, 2).Value = Number
        End If
    Next Number
End Sub

' ------------------------------------------------------------------
' HOMEWORK START
Sub annualTotal()
    For day = 2 to 70926
        Cells(day,10).Values = 
    Next Day
End Sub

' ------------------------------------------------------------------

' Doesn't work.
Sub sorted()
    For Row = 1 To 10
        If Cells(Row + 1, 1).Value < Cells(Row, 1).Value Then
        MsgBox ("Not sorted!")
        Exit For
        End If
    Next Row
End Sub

' ------------------------------------------------------------------

Sub sorted()
    For Row = 1 To 10
        If Cells(Row + 1, 1).Value < Cells(Row, 1).Value Then
        MsgBox ("Not sorted!")
        Row = 100
        End If
    Next Row
End Sub

' ------------------------------------------------------------------

Sub isOrderedAscending()
    for row = 1 to 10
        current_val = Cells (row, 1).value
        next_val = Cells (row + 1, 1).value

        if next_val  > current_val Then
            Cells(row + 1,2).Value = "sorted"
        else 
            Cells(row + 1,2).Value = "not sorted"
        endif
    next row
End Sub

' ------------------------------------------------------------------

Sub lottoWinners()

winningnumber1 = Cells(2, 8).Value
winningnumber2 = Cells(3, 8).Value
winningnumber3 = Cells(4, 8).Value

For Row = 2 To 1001
    If Cells(Row, 3) = winningnumber1 Then
        Cells(2, 6).Value = Cells(Row, 3).Offset(, -2).Value
        Cells(2, 7).Value = Cells(Row, 3).Offset(, -1).Value
    ElseIf Cells(Row, 3) = winningnumber2 Then
        Cells(3, 6).Value = Cells(Row, 3).Offset(, -2).Value
        Cells(3, 7).Value = Cells(Row, 3).Offset(, -1).Value
    ElseIf Cells(Row, 3) = winningnumber3 Then
        Cells(4, 6).Value = Cells(Row, 3).Offset(, -2).Value
        Cells(4, 7).Value = Cells(Row, 3).Offset(, -1).Value
    End If
Next Row
End Sub

' ------------------------------------------------------------------

Sub nestedTotal()
    runningTotal = 0
    
    For Row = 1 To 5
        For col = 1 To 5
            runningTotal = runningTotal + Cells(Row, col).Value
        Next col
    Next Row
    MsgBox (runningTotal)
End Sub

' ------------------------------------------------------------------

Sub StarCounter()
    For person = 2 to 51
        row_star_count = 0

        for star_rating = 4 to 8
            current_val = Cells(person,star_rating).Value
            If current_val = "Full-Star" Then
                row_star_count = row_star_count + 1
            End If
        next star_rating

        Cells(person, 9).Values = row_star_count
    next person
End Sub

' ------------------------------------------------------------------

Sub cardSummer()

card_subtotal = 0
current_summary_row = 2

  For Row = 2 To 101

    current_card = Cells(Row, 1).Value
    next_card = Cells(Row + 1, 1).Value
    current_charge = Cells(Row, 3).Value
  
    If current_card = next_card Then
      card_subtotal = card_subtotal + current_charge
      Cell 
    Else
      card_subtotal = card_subtotal + current_charge
      Cells(Row, 4).Value = card_subtotal
      Cells(current_summary_row, 7) = current_card
      Cells(current_summary_row, 8) = card_subtotal
      current_summary_row = current_summary_row + 1
      card_subtotal = 0
    End If

  Next Row

End Sub

' ------------------------------------------------------------------

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

' ------------------------------------------------------------------