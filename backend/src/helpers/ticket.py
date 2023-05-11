"""
contains helper functions for the backend management
of the ticket API
"""


import boto3
import json
import os
import requests
import time

from datetime import datetime, timedelta
from decimal import Decimal
from random import randint


def delete_ticket_from_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Deletes a ticket from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Delete ticket from table
    table.delete_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

def update_ticket_in_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Updates a ticket in the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Update ticket in table
    table.update_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        },
        UpdateExpression="set #attrName = :attrValue",
        ExpressionAttributeNames={
            '#attrName': 'entry_time'
        },
        ExpressionAttributeValues={
            ':attrValue': Decimal(str(time.time()))
        }
    )

def submit_ticket_to_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Submits a ticket to the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Add ticket to table
    table.put_item(
        Item={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

def get_ticket_from_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Retrieves a ticket from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Get ticket from table
    response = table.get_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

    # Return ticket
    return response['Item']

def get_all_tickets():
    """
    Retrieves all tickets from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Get all tickets from table
    response = table.scan()

    # Return tickets
    return response['Items']



def delete_ticket_from_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Deletes a ticket from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Delete ticket from table
    table.delete_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

def update_ticket_in_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Updates a ticket in the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Update ticket in table
    table.update_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        },
        UpdateExpression="set #attrName = :attrValue",
        ExpressionAttributeNames={
            '#attrName': 'entry_time'
        },
        ExpressionAttributeValues={
            ':attrValue': Decimal(str(time.time()))
        }
    )

def submit_ticket_to_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Submits a ticket to the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Add ticket to table
    table.put_item(
        Item={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

def get_ticket_from_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Retrieves a ticket from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Get ticket from table
    response = table.get_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

    # Return ticket
    return response['Item']

def get_all_tickets():
    """
    Retrieves all tickets from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TICKETS_TABLE'])

    # Get all tickets from table
    response = table.scan()

    # Return tickets
    return response['Items']